import Conta from "../models/Conta";
import database from "./database";

const ContasRepository = {
  addNew: (Conta: Conta, callback: (id?: number) => void) => {
    console.log(Conta);
    const sql = "INSERT INTO Contas (conta, agencia) VALUES (?, ?)";
    const params = [Conta.description, Conta.checked === true ? 1 : 0];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  getAllContas: (callback: (Contas: Conta[]) => void) => {
    const sql = "SELECT * FROM Contas";
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows as Conta[]));
  },
  getById: (id: number, callback: (Conta?: Conta) => void) => {
    const sql = "SELECT * FROM Contas WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as Conta));
  },
  update: (id: number, Conta: Conta, callback: (notFound: boolean) => void) => {
    const sql = "UPDATE Contas SET description = ?, checked = ? WHERE id = ?";
    const params = [Conta.description, Conta.checked === true ? 1 : 0, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
  delete: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM Contas WHERE id = ?";
    const params = [id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
};
export default ContasRepository;
