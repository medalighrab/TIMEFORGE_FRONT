import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../chatservice/ChatMessage';
import { ChatService } from '../chatservice/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  messageInput: string = '';
  userId: string="";
  messageList: any[] = [];
  userList:any[]=[];
  selectedUserId: string = '';
  selectedUserName: string = '';
  selectedImage: File | null = null;
  roomId: string = '1';  
  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService,
    private route: ActivatedRoute,  
    ){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.userId = params['userId'];
        this.chatService.joinRoom(this.userId);
        this.lisenerMessage();
        this.getConnectedUsers();
    });

   
   
  }

  getConnectedUsers(): void {
    this.chatService.getAllUsers().subscribe(
      (users) => {
        this.userList = users; // Assurez-vous que la réponse de l'API est un tableau d'utilisateurs
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs connectés :', error);
      }
    );
  }

  sendFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.chatService.sendFileMessage(file, this.messageInput, this.selectedUserId);
      this.messageInput = '';
    }
  }

  sendMessage() {
    if (!this.selectedUserId) {
      console.error('No user selected to send the message.');
      return;
    }

    this.chatService.preditToxicity({ text: this.messageInput }).subscribe(
      (response) => {
        const toxicLabels = response.details.filter((label: any) =>
          ['toxic', 'obscene', 'insult'].includes(label.label) && label.score > 0.7
        );

        const chatMessage = {
          message: this.messageInput,
          user: this.userId,
          file: this.selectedImage,
          isToxic: toxicLabels.length > 0
        } as any;

        if (chatMessage.isToxic) {
          // Ajout local uniquement avec indication d’échec
          this.messageList.push({ ...chatMessage, message_side: 'sender' });
          this.messageInput = '';
          return;
        }

        if (this.selectedImage) {
          this.chatService.sendMessage(this.selectedUserId, chatMessage);
        } else {
          this.sendMessageWithoutAttachment(chatMessage);
        }

        this.messageInput = '';
      },
      (error) => {
        console.error('Toxicity detection API failed:', error);
        this.messageList.push({
          message: this.messageInput,
          user: this.userId,
          file: this.selectedImage,
          isToxic: true,
          message_side: 'sender'
        });
        this.messageInput = '';
      }
    );
  }




logItem(item: any) {
  console.log(item);
}


lisenerMessage() {
  this.chatService.getMessageSubject().subscribe((messages: any) => {
      console.log("Received messages:", messages);
      this.messageList = [...this.messageList, ...messages.map((item: any) => ({
          ...item,
          message_side: item.user === this.userId ? 'sender' : 'receiver'
      }))];
  });
}


onFileSelected(event: any) {
  this.selectedImage = event.target.files[0];
  console.log('Selected File:', this.selectedImage);

}


sendMessageWithoutAttachment(chatMessage: ChatMessage) {
  this.chatService.sendMessage(this.selectedUserId, chatMessage);
  console.log('Sending without attachment');
  // Update the message list after sending the message
  this.messageList.push({ ...chatMessage, message_side: 'sender' });
  if (this.messageList.length > 100) {
      this.messageList.shift();
  }
}


  selectUser(user: any) {
    this.selectedUserId = user.idUser;
    console.log("rayen",this.selectedUserId)
    this.updateTopMenuTitle(user.name);
    console.log(this.selectedUserId) // Stockez l'ID de l'utilisateur sélectionné
}


  filterTable() {
    const filter = (document.getElementById('searchInput') as HTMLInputElement).value.toUpperCase();
    const users = document.querySelectorAll('.list-unstyled.chat-list li');
    users.forEach(user => {
      const name = (user.querySelector('.name') as HTMLElement).innerText.toUpperCase();
      if (name.indexOf(filter) > -1) {
        (user as HTMLElement).style.display = ''; // Convertir l'élément en HTMLElement
      } else {
        (user as HTMLElement).style.display = 'none'; // Convertir l'élément en HTMLElement
      }
    });
}

updateTopMenuTitle(userName: string) {
  this.selectedUserName = userName;
}



handleImageUpload(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.selectedImage = file;
  }
}






}