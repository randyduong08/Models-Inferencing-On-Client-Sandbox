import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import * as onnx from 'onnxruntime-web';
import { PreTrainedTokenizer } from '@xenova/transformers';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sentiment',
  standalone: true,
  imports: [HlmInputDirective, FormsModule],
  templateUrl: './sentiment.component.html',
  styleUrl: './sentiment.component.scss'
})
export class SentimentComponent implements OnInit, OnDestroy {
  session!: onnx.InferenceSession;
  options: any;
  tokenizer!: PreTrainedTokenizer;
  message: string ='';

  async ngOnInit(): Promise<void> {
    onnx.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
    
    this.tokenizer = await PreTrainedTokenizer.from_pretrained('bert-base-uncased');

    console.log(this.tokenizer);

    this.options = {
      executionProviders: ['wasm'],
    };

    this.session = await onnx.InferenceSession.create('../../../assets/xtreme_distil_sentiment.onnx', this.options);

  }

  ngOnDestroy(): void {
      
  }

  prepare_onnx_model_inputs(encodings: number[]): any {
    let input_ids = new Array(encodings.length);
    let attention_mask = new Array(encodings.length);
    let token_type_ids = new Array(encodings.length);
    for (let i=0; i < encodings.length; i++) {
      input_ids[i] = BigInt(encodings[i]);
      attention_mask[i] = BigInt(1);
      token_type_ids[i] = BigInt(0);
    }

    console.log('input ids: ', input_ids);

    const model_input_ids = new onnx.Tensor('int64', BigInt64Array.from(input_ids), [1, input_ids.length]);
    const model_attention_mask = new onnx.Tensor('int64', BigInt64Array.from(attention_mask), [1, attention_mask.length]);
    const model_token_type_ids = new onnx.Tensor('int64', BigInt64Array.from(token_type_ids), [1, token_type_ids.length]);

    return {
      input_ids: model_input_ids,
      attention_mask: model_attention_mask,
      token_type_ids: model_token_type_ids,
    }
  }


  sigmoid(num: any): any {
    return 1/(1/Math.pow(Math.E, -num));
  }


  softmax(logits: any): Float32Array {
    const maxLogit = Math.max(...logits);
    const scores = logits.map((l: number) => Math.exp(l - maxLogit));
    const sum = scores.reduce((a: any, b: any) => a + b, 0);
    return scores.map((s: number) => s / sum);
  }


  async processInput(): Promise<void> {
    if (this.message.length < 2) return;
    console.log(this.message);

    try {
      const tokenizedInput = this.tokenizer.encode(this.message, null, { add_special_tokens: true });

      const modelInputs = this.prepare_onnx_model_inputs(tokenizedInput);

      const modelOutput = await this.session.run(modelInputs, ['output_0']);
      //TODO: FIX AND TEST ONNX MODEL -- DOESNT SEEM TO WORK...
      const logits = modelOutput['output_0'].data

      console.log(logits[0], ' | ', logits[1]);

      const probs = this.softmax(logits);

      console.log('probs: ', probs);

      console.log(tokenizedInput);
      console.log('model output:', modelOutput);
    } catch (error) {
      console.error('Error processing input:', error);
    }
  }
}
