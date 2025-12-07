import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      status: "success",
      message: "Server is running successfully",
      timestamp: new Date().toISOString(),
    };
  }
}
