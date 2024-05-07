import express from "express";
import Conta from "../models/Conta";
import ContasRepository from "../repositories/contas-repository";

const ContasR = express.Router();

ContasR.post("/Contas", (req, res) => {
  const conta: Conta = req.body as Conta;
  ContasRepository.addNew(conta, (id) => {
    if (id) {
      res.status(201).location(`/Contas/${id}`).send();
    } else {
      res.status(400).send();
    }
  });
});

ContasR.get("/Contas", (req, res) => {
  ContasRepository.getAllContas((contas) => res.json(contas));
});

ContasR.get("/Contas/:id", (req, res) => {
  const id: number = +req.params.id;
  ContasRepository.getById(id, (item) => {
    if (item) {
      res.json(item);
    } else {
      res.status(404).send();
    }
  });
});

ContasR.put("/Contas/:id", (req, res) => {
  const id: number = +req.params.id;
  ContasRepository.update(id, req.body, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

ContasR.delete("/Contas/:id", (req, res) => {
  const id: number = +req.params.id;
  ContasRepository.delete(id, (notFound) => {
    if (notFound) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});

export default ContasR;
