import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../../service/container.service';
import { DockerContainer } from '../../model/docker-container';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrl: './container-list.component.css'
})
export class ContainerListComponent implements OnInit {
  containers: DockerContainer[] = [];
  errorMessage: string | null = null;

  constructor(private containerService: ContainerService) { }

  ngOnInit(): void {
    this.loadContainers();
  }

  loadContainers(): void {
    this.containerService.getContainers().subscribe({
      next: (data) => {
        this.containers = data;
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = 'Error loading containers';
        console.error('Component error:', err);
      }
    });
  }

  performAction(action: string, id: string): void {
    const operations = {
      start: () => this.containerService.startContainer(id),
      stop: () => this.containerService.stopContainer(id),
      restart: () => this.containerService.restartContainer(id)
    };

    operations[action as keyof typeof operations]().subscribe({
      next: () => {
        setTimeout(() => this.loadContainers(), 500); // Refresh after short delay
        this.errorMessage = null;
      },
      error: (err) => {
        this.errorMessage = `Error performing ${action} action`;
        console.error(err);
      }
    });
  }

  getStatusClass(state: string): string {
    return state.toLowerCase() === 'running' ? 'text-success' : 'text-danger';
  }

  truncateId(id: string): string {
    return id?.substring(0, 12) || 'N/A';
  }
}
