import {Controller, Get, Param} from '@nestjs/common';
import {UserService} from "@src/user/user.service";
import {User} from "@src/user/user.model";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getAll(): Promise<User[]> {
        return this.userService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<User>{
        return this.userService.getOne(id)
    }

}
