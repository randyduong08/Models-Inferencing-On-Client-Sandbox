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
  options: any;
  tokenizer: any;

  async ngOnInit(): Promise<void> {
    onnx.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

    this.options = {
      executionProviders: ['wasm'],
    };

    this.session = await onnx.InferenceSession.create('../../../assets/quant_xtreme_distil_sentiment.onnx', this.options);

  }

  ngOnDestroy(): void {
      
  }
}
