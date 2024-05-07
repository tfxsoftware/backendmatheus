import Conta from "../models/Conta";
import database from "./database";

const ContasRepository = {
  addNew: (Conta: Conta, callback: (id?: number) => void) => {
    console.log(Conta);
    const sql = "INSERT INTO contas (conta, agencia) VALUES (?, ?)";
    const params = [Conta.conta, Conta.agencia];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  getAllContas: (callback: (Contas: Conta[]) => void) => {
    const sql = "SELECT * FROM contas";
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows as Conta[]));
  },
  getById: (id: number, callback: (Conta?: Conta) => void) => {
    const sql = "SELECT * FROM contas WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as Conta));
  },
  update: (id: number, Conta: Conta, callback: (notFound: boolean) => void) => {
    const sql = "UPDATE contas SET description = ?, checked = ? WHERE id = ?";
    const params = [Conta.conta, Conta.agencia, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
  delete: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM contas WHERE id = ?";
    const params = [id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
};
export default ContasRepository;
