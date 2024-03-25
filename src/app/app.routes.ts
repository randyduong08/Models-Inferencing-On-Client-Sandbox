import { Routes } from '@angular/router';
import { DetectionComponent } from './components/detection/detection.component';
import { TranscriptComponent } from './components/transcript/transcript.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
    { path: 'sentiment', component: SentimentComponent },
    { path: 'transcript', component: TranscriptComponent },
    { path: 'detection', component: DetectionComponent },
    { path: 'landing', component: LandingComponent },
    { path: '', redirectTo: 'landing', 'pathMatch': 'full'}
];
