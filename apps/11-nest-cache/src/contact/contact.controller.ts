import {
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  @UseInterceptors(CacheInterceptor)
  @CacheKey('__key')
  @CacheTTL(60000)
  @Get('')
  async getContacts(@Res() res) {
    const contacts = await this.contactService.getContacts();
    return res.status(HttpStatus.OK).json(contacts);
  }

  @UseInterceptors(CacheInterceptor)
  // Automatically cache the response for this endpoint
  @CacheKey('_key')
  @CacheTTL(60000)
  // now in milliseconds (1 minute === 60000)
  @Get('/:contactId')
  async getContact(@Res() res, @Param('contactId') contactId) {
    const contact = await this.contactService.getContact(contactId);
    if (!contact) throw new NotFoundException('Contact does not exist');
    return res.status(HttpStatus.OK).json(contact);
  }

  @Post('/new')
  async addContact(@Res() res, @Body() createContactDTO: CreateContactDto) {
    const newContact = await this.contactService.addContact(createContactDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been created successfully',
      contact: newContact,
    });
  }

  @Put('/edit')
  async editContact(
    @Res() res,
    @Query('contactId') contactId,
    @Body() createContactDTO: CreateContactDto,
  ) {
    const editedContact = await this.contactService.editContact(
      contactId,
      createContactDTO,
    );
    if (!editedContact) throw new NotFoundException('Contact does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been updated successfully',
      post: editedContact,
    });
  }

  @Delete('/delete')
  async deleteContact(@Res() res, @Query('contactId') contactId) {
    const deletedContact = await this.contactService.deleteContact(contactId);
    if (!deletedContact) throw new NotFoundException('Contact does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been deleted',
      contact: deletedContact,
    });
  }
}
