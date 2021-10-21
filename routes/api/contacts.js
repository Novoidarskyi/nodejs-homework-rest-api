const express = require("express");
const router = express.Router();
const {
  validationAddContact,
  validationUpdateContact,
  validationContactFavorite,
} = require("../../models/contacts/validation");
const authenticate = require("../../middlewares/authenticate");
const contactOperations = require("../../models/contacts/index");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const contacts = await contactOperations.listContacts(_id);
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactOperations.getContactById(contactId);
    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({ status: "success", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, validationAddContact, async (req, res, next) => {
  try {
    const result = { ...req.body, owner: req.user._id };
    const newContact = await contactOperations.addContact(result);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { newContact },
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:contactId",
  authenticate,
  validationUpdateContact,
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contact = await contactOperations.updateContact(
        contactId,
        req.body
      );
      if (!contact) {
        const error = new Error(`Contact with id=${contactId} not found`);
        error.status = 404;
        throw error;
      }
      res.status(201).json({
        status: "success",
        code: 201,
        data: { contact },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validationContactFavorite,
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      if (!req.body) {
        const error = new Error("missing field favorite");
        error.status = 400;
        throw error;
      }
      const contact = await contactOperations.updateStatusContact(
        contactId,
        req.body
      );
      if (!contact) {
        const error = new Error(`Contact with id=${contactId} not found`);
        error.status = 404;
        throw error;
      }
      res.status(201).json({
        status: "success",
        code: 201,
        data: { contact },
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.removeContact(contactId);
    if (!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
