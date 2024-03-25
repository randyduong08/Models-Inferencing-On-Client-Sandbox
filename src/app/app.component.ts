import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DetectionComponent } from './components/detection/detection.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { TranscriptComponent } from './components/transcript/transcript.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavBarComponent,
    DetectionComponent,
    SentimentComponent,
    TranscriptComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sandbox';
}
