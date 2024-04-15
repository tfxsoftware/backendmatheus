import Item from "../models/Item";
import database from "./database";

const itemsRepository = {
  addNew: (item: Item, callback: (id?: number) => void) => {
    console.log(item);
    const sql = "INSERT INTO items (description, checked) VALUES (?, ?)";
    const params = [item.description, item.checked === true ? 1 : 0];
    database.run(sql, params, function (_err) {
      callback(this?.lastID);
    });
  },
  getAllItems: (callback: (items: Item[]) => void) => {
    const sql = "SELECT * FROM items";
    const params: any[] = [];
    database.all(sql, params, (_err, rows) => callback(rows as Item[]));
  },
  getById: (id: number, callback: (item?: Item) => void) => {
    const sql = "SELECT * FROM items WHERE id = ?";
    const params = [id];
    database.get(sql, params, (_err, row) => callback(row as Item));
  },
  update: (id: number, item: Item, callback: (notFound: boolean) => void) => {
    const sql = "UPDATE items SET description = ?, checked = ? WHERE id = ?";
    const params = [item.description, item.checked === true ? 1 : 0, id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
  delete: (id: number, callback: (notFound: boolean) => void) => {
    const sql = "DELETE FROM items WHERE id = ?";
    const params = [id];
    database.run(sql, params, function (_err) {
      callback(this.changes === 0);
    });
  },
};
export default itemsRepository;
