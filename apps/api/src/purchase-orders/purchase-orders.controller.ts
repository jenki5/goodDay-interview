import {Controller, Get, Param} from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';

@Controller('purchase-orders')
export class PurchaseOrdersController {
  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {
  }

  @Get()
  findAll() {
    return this.purchaseOrdersService.findAll();
  }

  @Get(':sortBy')
  findAllSorted(@Param('sortBy') sortedBy: string) {
    return this.purchaseOrdersService.findAllSorted(sortedBy);
  }
}
