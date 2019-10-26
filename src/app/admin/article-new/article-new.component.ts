import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {

  response$ = null;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService
    ) {}

  articleForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    content: ['', [Validators.required, Validators.minLength(4)]]
  })

  ngOnInit() {
  }

  get Title() {
    return this.articleForm.get('title')
  }

  get Content() {
    return this.articleForm.get('content')
  }

  async submit() {
    console.log('submit : ', this.articleForm.value);
    this.response$ = await this.articleService.createArticle(this.articleForm.value)
      .subscribe(res => console.log(res))
  }

}
