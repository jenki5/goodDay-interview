import SelectList from "../components/selectList";
import { getFormattedDate, getParentItems, getPurchaseOrders } from "../utils";

const sortByArr = [
  {
      key: "expected_delivery_date",
      value: "Delivery Date",
  },
  {
      key: "vendor_name",
      value: "Vendor Name",
  },
  {
      key: "order_date",
      value: "Order Date",
  },
];

export default async function Index({ searchParams }: any) {
  const { sort } = searchParams;
  let purchaseOrders = await getPurchaseOrders(sort);
  const parentItems = await getParentItems();
  

  
  let items: Item[] = [];

  // Hacky, but but needed a quick way to get all items from the db.
  parentItems.forEach(parentItem => (
    items.push(...parentItem.items)
  ))



  return (
    <>
      <h1 className="text-2xl">Purchase Orders</h1>
      <div className="">
        <SelectList list={sortByArr} selected={sort} />
      </div>
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
        <tr>
          <th
            className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">#
          </th>
          <th
            className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">Delivery Date
          </th>
          <th
            className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">Order Date
          </th>
          <th
            className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">Purchase Order
          </th>
          <th
            className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-left">Line Items
          </th>
        </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
        {purchaseOrders.map((purchaseOrder: PurchaseOrder) => {
          let total = 0;
          return (
          <tr key={purchaseOrder.id}>
            <td
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{purchaseOrder.id}</td>
            <td
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{getFormattedDate(new Date(purchaseOrder.expected_delivery_date))}</td>
            <td
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{getFormattedDate(new Date(purchaseOrder.order_date))}</td>
            <td
              className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">{purchaseOrder.vendor_name}</td>
            <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
              <ul>
                {purchaseOrder.purchase_order_line_items.map((lineItem) => {
                  const {id, unit_cost, quantity} = lineItem;
                  total += unit_cost * quantity;
                  const item = items.find(i => i.id === lineItem.item_id);
                  return(
                  <li key={id}>${unit_cost} {quantity} {item?.name}</li>
                )})}
                <li>Total: ${total}</li>
              </ul>
            </td>
          </tr>
        )})}
        </tbody>
      </table>
    </>
  );
}
