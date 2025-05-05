import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MyServiceService } from '../../services/my-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { jwtDecode } from 'jwt-decode';



export interface Task {
  id: number;
  title: string;
  status: 'NOT_STARTED_YET' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

@Component({
  selector: 'app-add-project-component',
  templateUrl: './add-project-component.component.html',
  styleUrls: ['./add-project-component.component.css']
})
export class AddProjectComponentComponent {
  projects: any[] = [];
  projectForm: FormGroup;
  isEditing: boolean = false;
  currentProjectId: number | null = null;
  notification: string = '';
  selectedProjectDetails: any = null; // 👈 Pour afficher dans la sidebar
  projectComments: any[] = [];
  newComment: string = '';
  currentUsername: string = '';
  upcomingProjects: any[] = [];
  today: string = new Date().toISOString().split('T')[0];
  projectProgress: number = 0;
  analysisResult: any = null;
  isAnalyzing: boolean = false;
  analysisError: string = '';
  currentUserId: number | null = null;  // 👈 nouvelle variable pour stocker le userId




  constructor(private myService: MyServiceService, private fb: FormBuilder, private http: HttpClient,private sanitizer: DomSanitizer, 
) { 
   
    this.projectForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      deadline: ['', [Validators.required, this.deadlineInFutureValidator]]    });
  }deadlineInFutureValidator(control: any) {
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // on ignore l'heure
    if (inputDate <= today) {
      return { pastDeadline: true };
    }
    return null;
  }

 
  ngOnInit(): void {
    this.loadProjects();
  
    const token = localStorage.getItem('token');
    console.log('Token depuis localStorage :', token);
  
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        console.log('Email (sub) décodé :', decoded.sub);
        this.currentUsername = decoded.sub;
  
        // ⚠️ Ici on recharge aussi le userId !
        this.loadCurrentUserId(this.currentUsername);
  
      } catch (e) {
        console.error('Erreur lors du décodage du token:', e);
      }
    } else {
      console.warn('Aucun token trouvé dans localStorage.');
    }
  }
  loadCurrentUserId(email: string): void {
    this.http.get<any>(`http://localhost:8089/users/user/${this.currentUsername}`)
          .subscribe(user => {
        console.log('Réponse user:', user);
        this.currentUserId = user.idUser;  // ⚠️ Attention ici à bien prendre idUser
        console.log('UserId récupéré :', this.currentUserId);
      }, error => {
        console.error('Erreur lors de la récupération du userId:', error);
      });
  }
  

  upcomingDeadlines: any[] = [];

loadProjects(): void {
  console.log('Token avant la requête :', localStorage.getItem('authToken'));
  this.myService.getAllProjects().subscribe(data => {
    this.projects = data;
    this.upcomingDeadlines = this.projects.filter(project => {
      const today = new Date();
      const deadline = new Date(project.deadline);
      const diffInTime = deadline.getTime() - today.getTime();
      const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      return diffInDays >= 0 && diffInDays <= 7;
    });
  });
  
 

}
resetForm(): void {
  this.isEditing = false;
  this.selectedProjectDetails = null;
  this.projectForm.reset({
    name: '',
    description: '',
    deadline: this.today  // 👈 la date par défaut
  });
}


showFormSidebar: boolean = false;

openAddSidebar(): void {
  this.resetForm();
  this.showFormSidebar = true;
}

closeFormSidebar(): void {
  this.showFormSidebar = false;
}






selectProject(project: any): void {
  this.projectForm.patchValue({
    id: project.projectid,
    name: project.name,
    description: project.description,
    deadline: project.deadline?.split('T')[0]
  });
  this.isEditing = true;
  this.currentProjectId = project.projectid;
  this.showFormSidebar = true;
  this.selectedProjectDetails = project; // Assurez-vous que selectedProjectDetails est bien défini ici

}
openCommentSidebar(project: any): void {
  this.selectedProjectDetails = project;
  // Tu peux charger les commentaires ici si tu veux
}


  saveProject(): void {
    if (this.projectForm.valid) {
      const projectData = this.projectForm.value;

      if (this.isEditing) {
        this.myService.updateProject(this.currentProjectId!, projectData).subscribe(() => {
          this.handleSuccess('Project updated successfully!');
        }, (error) => {
          this.notification = 'Failed to update the project!';
          setTimeout(() => this.notification = '', 3000);
        });
      } else {
        this.myService.createProject(projectData).subscribe(() => {
          this.handleSuccess('Project created successfully!');
        }, (error) => {
          this.notification = 'Failed to create the project!';
          setTimeout(() => this.notification = '', 3000);
        });
      }
    }
  }

  deleteProject(projectid: number): void {
    if (!projectid) {
      this.notification = 'ID du projet manquant ou invalide';
      setTimeout(() => this.notification = '', 3000);
      return;
    }

    if (confirm('Are you sure you want to delete this project?')) {
      this.myService.deleteProject(projectid).subscribe({
        next: (res) => {
          if (res === 'Project deleted successfully') {
            this.handleSuccess('Project deleted successfully!');
          } else {
            this.notification = 'Failed to delete the project!';
            setTimeout(() => this.notification = '', 3000);
          }
        },
        error: (error) => {
          this.notification = 'Failed to delete the project!';
          setTimeout(() => this.notification = '', 3000);
        }
      });
    }
  }

  handleSuccess(message: string): void {
    this.notification = message;
    this.loadProjects();
    this.resetForm();
    setTimeout(() => this.notification = '', 3000);
  }
  public getProgressColor(): string {
    if (this.projectProgress < 30) return 'progress-danger';
    if (this.projectProgress < 70) return 'progress-warning';
    return 'progress-success';
  }
  // 🎯 Fonction pour afficher la sidebar
  showProjectDetails(project: any): void {
    this.selectedProjectDetails = project;
    this.fetchComments(project.projectid); // 👈 Charger les commentaires au clic sur "Details"
  }

  // ❌ Fermer la sidebar
  closeSidebar(): void {
    this.selectedProjectDetails = null;
  }
  fetchComments(projectId: number) {
    this.http.get<any[]>(`http://localhost:8089/comments/commments_for_Project/${projectId}`)
      .subscribe(comments => {
        this.projectComments = comments;
        console.log("Commentaires récupérés : ", comments);  // Vérifier les commentaires reçus
      });
  }
  
  
  addComment() {
    if (!this.newComment.trim()) return;
  
    const projectId = this.selectedProjectDetails?.projectid;
    const userId = this.currentUserId;
  
    console.log("projectId:", projectId);
    console.log("userId:", userId);
    console.log("comment:", this.newComment);
  
    if (!projectId || !userId) {
      console.error("projectId ou userId est manquant !");
      return;
    }
  
    const params = {
      commentText: this.newComment
    };
  
    this.http.post(
      `http://localhost:8089/comments/affecter/${projectId}/${userId}`,
      null,
      { params }
    ).subscribe(
      (response) => {
        console.log("Commentaire ajouté avec succès:", response);
        this.newComment = '';
        this.fetchComments(projectId);
      },
      (error) => {
        console.error("Erreur lors de l'envoi du commentaire :", error);
      }
    );
  }
  
  
  
 
    
  
  
  
  
  scrollToForm() {
    const element = document.getElementById('projectForm');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  










  // ✅ Nouvelle fonction pour lancer l’analyse IA :
runAIAnalysis(): void {
  const projectId = this.selectedProjectDetails?.projectid;
  if (!projectId) {
    this.analysisError = 'Projet invalide pour l’analyse.';
    return;
  }

  // Reset état précédent
  this.analysisResult = null;
  this.analysisError = '';
  this.isAnalyzing = true;

  // Charger d’abord les commentaires
  this.http.get<any[]>(`http://localhost:8089/comments/commments_for_Project/${projectId}`)
    .subscribe(
      (commentsData) => {
        const formattedComments = commentsData.map(c => ({ comment: c.comment }));

        if (formattedComments.length === 0) {
          this.analysisError = 'Aucun commentaire à analyser pour ce projet.';
          this.isAnalyzing = false;
          return;
        }

        // Appel API Flask ➔ IA
        this.http.post<any>('http://127.0.0.1:5000/analyze', { comments: formattedComments })
          .subscribe(
            (response) => {
              console.log("Analyse IA:", response);
              this.analysisResult = {
                stress: response.stress_level,
                summary: response.summary,
                totalComments: formattedComments.length
              };
              this.isAnalyzing = false;
            },
            (error) => {
              console.error("Erreur API IA :", error);
              this.analysisError = "Erreur lors de l'analyse IA. Vérifiez le serveur Flask.";
              this.isAnalyzing = false;
            }
          );
      },
      (error) => {
        console.error("Erreur récupération des commentaires :", error);
        this.analysisError = "Impossible de récupérer les commentaires.";
        this.isAnalyzing = false;
      }
    );
}


  
  
}

