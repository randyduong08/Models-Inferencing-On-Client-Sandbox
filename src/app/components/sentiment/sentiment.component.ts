import { Component, OnDestroy, OnInit } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import * as onnx from 'onnxruntime-web';

@Component({
  selector: 'app-sentiment',
  standalone: true,
  imports: [HlmInputDirective],
  templateUrl: './sentiment.component.html',
  styleUrl: './sentiment.component.scss'
})
export class SentimentComponent implements OnInit, OnDestroy {
  session!: onnx.InferenceSession;

  async ngOnInit(): Promise<void> {
    
  }

  ngOnDestroy(): void {
      
  }
}
