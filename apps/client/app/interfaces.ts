interface PurchaseOrderLineItem {
    id: number;
    item_id: number;
    unit_cost: number;
    quantity: number;
  
  }
  
  interface PurchaseOrder {
    id: number;
    vendor_name: string;
    order_date: string;
    expected_delivery_date: string;
    purchase_order_line_items: PurchaseOrderLineItem[];
  }
  
  interface Item {
    id: number;
    name: string;
    sku: string;
  }
  
  interface ParentItem {
    id: number;
    name: string;
    items: Item[];
  }

  interface KeyValuePair {
    key: string;
    value: string;
  }