import express from "express";
import Item from "../models/Conta";
import itemsRepository from "../repositories/contas-repository";

const itemsR = express.Router();

itemsR.post("/items", (req, res) => {
  const item: Item = req.body as Item;
  itemsRepository.addNew(item, (id) => {
    if (id) {
      res.status(201).location(`/items/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});

itemsR.get("/items", (req, res) => {
  itemsRepository.getAllItems((itens) => res.json(itens));
});

itemsR.get("/items/:id", (req, res) => {
  const id: number = +req.params.id;
  itemsRepository.getById(id, (item) => {
    if (item) {
      res.json(item);
    } else {
      res.status(404).send();
    }
  });
});

itemsR.put("/items/:id", (req, res) => {
  const id: number = +req.params.id;
  itemsRepository.update(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

itemsR.delete("/items/:id", (req, res) => {
  const id: number = +req.params.id;
  itemsRepository.delete(id, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

export default itemsR;
