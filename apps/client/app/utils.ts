export const getFormattedDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}
  
export async function getPurchaseOrders(sort = ""): Promise<PurchaseOrder[]> {
    const res = await fetch(`http://localhost:3100/api/purchase-orders/${sort}`, {cache: 'no-cache'});
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
}
  
export async function getParentItems(): Promise<ParentItem[]> {
    const res = await fetch('http://localhost:3100/api/parent-items', {cache: 'no-cache'});
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return res.json();
}