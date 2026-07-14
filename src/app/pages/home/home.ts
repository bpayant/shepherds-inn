import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageForm } from '../../components/message-form/message-form';
import { ScheduleVisitForm } from '../../components/schedule-visit-form/schedule-visit-form';
import { MAX_REVIEW_RATING, REVIEW_ROTATION_INTERVAL_MS, REVIEWS} from '../../shared/reviews/reviews';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MessageForm, ScheduleVisitForm],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home {
  showMessageForm = false;
  showScheduleVisitForm = false;
  
  reviews = REVIEWS.filter(review => review.quote.trim().length > 0);
  currentReviewIndex = 0;

  private reviewTimerId?: number;

  ngOnInit(): void {
    this.startReviewTimer();
  }

  ngOnDestroy(): void {
    this.stopReviewTimer();
  }

  get currentReview() {
    return this.reviews[this.currentReviewIndex];
  }

  get currentReviewNumber(): number {
    return this.currentReviewIndex + 1;
  }

  previousReview(): void {
    this.goToReview(this.currentReviewIndex - 1);
  }

  nextReview(): void {
    this.goToReview(this.currentReviewIndex + 1);
  }

  getReviewStars(rating: number): string {
    const safeRating = Math.max(0, Math.min(MAX_REVIEW_RATING, rating));

    return '★'.repeat(safeRating) + '☆'.repeat(MAX_REVIEW_RATING - safeRating);
  }

  private goToReview(index: number): void {
    const reviewCount = this.reviews.length;

    if (reviewCount === 0) {
      return;
    }

    this.currentReviewIndex = (index + reviewCount) % reviewCount;
    this.restartReviewTimer();
  }

  private startReviewTimer(): void {
    if (this.reviews.length <= 1) {
      return;
    }

    this.reviewTimerId = window.setInterval(() => {
      this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
    }, REVIEW_ROTATION_INTERVAL_MS);
  }

  private stopReviewTimer(): void {
    if (this.reviewTimerId === undefined) {
      return;
    }

    window.clearInterval(this.reviewTimerId);
    this.reviewTimerId = undefined;
  }

  private restartReviewTimer(): void {
    this.stopReviewTimer();
    this.startReviewTimer();
  }
}