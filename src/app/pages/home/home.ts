import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageForm } from '../../components/message-form/message-form';
import { PageCta } from '../../components/page-cta/page-cta';
import { ScheduleVisitForm } from '../../components/schedule-visit-form/schedule-visit-form';
import { MAX_REVIEW_RATING, REVIEWS } from '../../shared/reviews/reviews';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MessageForm, PageCta, ScheduleVisitForm],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  showMessageForm = false;
  showScheduleVisitForm = false;

  readonly featuredReview =
    REVIEWS.find((review) => review.featured && review.quote.trim().length > 0) ??
    REVIEWS.find((review) => review.quote.trim().length > 0);

  getReviewStars(rating: number): string {
    const safeRating = Math.max(0, Math.min(MAX_REVIEW_RATING, rating));

    return '★'.repeat(safeRating) + '☆'.repeat(MAX_REVIEW_RATING - safeRating);
  }
}
