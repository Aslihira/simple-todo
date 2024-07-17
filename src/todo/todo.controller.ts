import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserEmail } from '../common/decorator/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todos')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({description : "To add a new task wrt user email.", summary:"Add a new task."})
  create(@Body() createTodoDto: CreateTodoDto, @UserEmail() userEmail : string ): Promise<any> {
    return this.todoService.create(createTodoDto, userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({description : "Fetch all the tasks a user have added.", summary:"Fetch all the user's tasks."})
  findAll( @UserEmail()         
    userEmail : string) {
    return this.todoService.findAll(userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({description : "Fetch the tasks by its id.", summary:"Fetch the tasks by its id."})
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id); // +id means id is being parsed into an int ( its coming as a string )
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({description : "Update the tasks by its id.", summary:"Update the tasks by its id."})
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({description : "Delete the tasks by its id.", summary:"Delete the tasks by its id."})
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}