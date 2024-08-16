const Task = require("../model/tasks.model");
const { paginationHelpers } = require("../../../helper/pagination");
const searchHelpers = require("../../../helper/search");

// [GET] /tasks
const getAll = async (req, res) => {
  const find = {
    deleted: false,
  };
  const sort = {};
  const query = req.query;

  // Pagination
  const countRecord = await Task.countDocuments(find);
  let ObjectPage = paginationHelpers(
    req.query,
    {
      currentPage: 3,
      limitPage: 2,
    },
    countRecord
  );
  //End Pagination

  // Bộ lọc trạng thái
  if (query.status) {
    find.status = req.query.status;
  }
  // End Bộ lọc trạng thái

  // Sort
  if (query.sortKey && query.sortValue) {
    sort[query.sortKey] = query.sortValue;
  }
  //End sort

  // Search
  const objectSearch = searchHelpers(req.query);
  if (objectSearch.regex) {
    find.title = objectSearch.regex;
  }
  //End Search

  const task = await Task.find(find)
    .sort(sort)
    .skip(ObjectPage.skipPage)
    .limit(ObjectPage.limitPage);

  return res.status(200).json({
    errorCode: 0,
    data: task,
  });
};

// [GET] /tasks/detail/:id
const detail = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.find({
      deleted: false,
      _id: id,
    });
    // console.log(task)
    res.json(task);
    return res.status(200).json({
      errorCode: 0,
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        code: 400,
        message: "Không tìm thấy!",
      },
    });
  }
};

// [POST] /tasks
const CreatePost = async (req, res) => {
  //   console.log(req.body);
  try {
    const task = await Task.create(req.body);
    return res.status(200).json({
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        code: 400,
        message: "Tạo task thất bại.",
      },
    });
  }
};

// [PATCH] /tasks/change-status/:id
const ChangeStatusPatch = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    // console.log(id);
    const task = await Task.updateOne(
      { _id: id },
      {
        status: status,
      }
    );
    return res.status(200).json({
      data: task,
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        code: 400,
        message: "Cập nhật thất bại.",
      },
    });
  }
};

// [PATCH] /tasks/change-multi
const ChangeMultiPatch = async (req, res) => {
  const { ids, key, value } = req.body;
  // console.log({ ids, key, value });
  try {
    switch (key) {
      case "status":
        const result = await Task.updateMany(
          { _id: { $in: ids } },
          { $set: { status: value } }
        );
        return res.status(200).json({
          data: result,
        });
        break;

      default:
        return res.status(400).json({
          error: {
            code: 400,
            message: "Cập nhật thất bại.",
          },
        });
        break;
    }
  } catch (error) {
    return res.status(400).json({
      error: {
        code: 400,
        message: "Cập nhật thất bại.",
      },
    });
  }
};

// [PATCH] /tasks/:id
const editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const data = await Task.updateOne({ _id: id }, req.body);

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        code: 400,
        message: "Cập nhật thất bại.",
      },
    });
  }
};

// [DELETE] /tasks/:id
const deleteTaskDelete = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Task.updateOne(
      { _id: id },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );

    // const data = await Task.deleteOne({ _id: id });
    // Xóa vĩnh viễn

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        code: 400,
        message: "Cập nhật thất bại.",
      },
    });
  }
};

module.exports = {
  detail,
  getAll,
  CreatePost,
  ChangeStatusPatch,
  ChangeMultiPatch,
  editPatch,
  deleteTaskDelete,
};
