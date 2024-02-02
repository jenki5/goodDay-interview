import {Injectable} from '@nestjs/common';
import {PurchaseOrders} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class PurchaseOrdersService {
  constructor(private prisma: PrismaService) {
  }

  async findAllSorted(sortBy = "expected_delivery_date"): Promise<PurchaseOrders[]> {
    return (await this.prisma.purchaseOrders.findMany({orderBy: [
      {
        [sortBy]: 'asc',
      },
      {
        vendor_name: 'asc',
      },
    ],
    include: {purchase_order_line_items: true}
    }));
  }
}
