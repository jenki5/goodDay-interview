import {Injectable} from '@nestjs/common';
import {PurchaseOrders} from "@prisma/client";
import {PrismaService} from "../prisma.service";

@Injectable()
export class PurchaseOrdersService {
  constructor(private prisma: PrismaService) {
  }

  async findAll(): Promise<PurchaseOrders[]> {
    return (await this.prisma.purchaseOrders.findMany({include: {purchase_order_line_items: true}})).sort((a, b) => new Date(a.expected_delivery_date).getTime() - new Date(b.expected_delivery_date).getTime());
  }

  async findAllSorted(sortBy: string): Promise<PurchaseOrders[]> {
    return (await this.prisma.purchaseOrders.findMany({include: {purchase_order_line_items: true}})).sort((a, b) => 0 - (b[sortBy] > a[sortBy] ? 1 : -1));
  }
}
