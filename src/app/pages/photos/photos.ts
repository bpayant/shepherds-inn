import { Component, ElementRef, ViewChild } from '@angular/core';

type GalleryPhoto = {
  src: string;
  alt: string;
  monthTitle: string;
  event?: string;
};

type GalleryMonth = {
  folder: string;
  title: string;
  photos: GalleryPhoto[];
};

const photos202605_MargaretsBirthday = [
  '708216657_1607107617457377_5658953393024654235_n.jpg'
];

const photos202605_UscProm = [
  '686060350_1584129643088508_3965142683634531150_n.jpg',
  '686060350_1584129826421823_2553651784167799813_n.jpg',
  '686489859_1584129856421820_1483299518334544294_n.jpg',
  '686532761_1584129863088486_8941865369895867178_n.jpg',
  '686993618_1584129786421827_5478721952485394751_n.jpg',
  '687210776_1584129816421824_6570117916815214429_n.jpg',
  '687862400_1584129739755165_688615288984036682_n.jpg',
  '688051307_1584129893088483_6551312965119092540_n.jpg',
  '688272375_1584129936421812_5420171899597224486_n.jpg',
  '688961570_1584129689755170_3684133196291860640_n.jpg',
  '689010514_1584129906421815_4436710570834905926_n.jpg',
  '689034075_1584129803088492_437491220994603062_n.jpg',
  '689051306_1584129883088484_8264614056619009450_n.jpg'
];

const photos202605_General = [
  '690588459_1588465869321552_7590461716791010475_n.jpg',
  '695845928_1592258745608931_8934778141234567302_n.jpg',
  '696156152_1592258715608934_7263768446786016927_n.jpg',
  '696932443_1592258752275597_3869732272798562867_n.jpg'
];

const photos202606_General = [
  '712524407_1612550106913128_5459625473092191142_n.jpg',
  '719828530_1618300419671430_1046351550750026785_n.jpg',
  '720166737_1618300393004766_8998232660249080631_n.jpg'
];

function buildPhotos(
  folder: string,
  monthTitle: string,
  fileNames: string[],
  event?: string
): GalleryPhoto[] {
  return fileNames.map((fileName) => ({
    src: `/images/photos/${folder}/${fileName}`,
    alt: event
      ? `${event} at The Shepherds Inn`
      : `Community photo at The Shepherds Inn - ${monthTitle}`,
    monthTitle,
    event
  }));
}

@Component({
  selector: 'app-photos',
  imports: [],
  templateUrl: './photos.html',
  styleUrl: './photos.css'
})
export class Photos {
  months: GalleryMonth[] = [
    {
      folder: '2026-06',
      title: 'June 2026',
      photos: [
        ...buildPhotos('2026-06', 'June 2026', photos202606_General)
      ]
    },
    {
      folder: '2026-05',
      title: 'May 2026',
      photos: [
        ...buildPhotos(
          '2026-05',
          'May 2026',
          photos202605_MargaretsBirthday,
          "Margaret's 102nd Birthday"
        ),
        ...buildPhotos(
          '2026-05',
          'May 2026',
          photos202605_UscProm,
          'USC Prom'
        ),
        ...buildPhotos('2026-05', 'May 2026', photos202605_General)
      ]
    }
  ];

  selectedMonthIndex = 0;
  selectedPhoto: GalleryPhoto = this.selectedMonth.photos[0];

  get selectedMonth(): GalleryMonth {
    return this.months[this.selectedMonthIndex];
  }

  get newerMonth(): GalleryMonth | undefined {
    return this.months[this.selectedMonthIndex - 1];
  }

  get olderMonth(): GalleryMonth | undefined {
    return this.months[this.selectedMonthIndex + 1];
  }

  selectPhoto(photo: GalleryPhoto): void {
    this.selectedPhoto = photo;
  }

  showNewerMonth(): void {
    if (!this.newerMonth) {
      return;
    }

    this.selectedMonthIndex--;
    this.selectedPhoto = this.selectedMonth.photos[0];
  }

  showOlderMonth(): void {
    if (!this.olderMonth) {
      return;
    }

    this.selectedMonthIndex++;
    this.selectedPhoto = this.selectedMonth.photos[0];
  }

  nextPhoto(): void {
    const currentIndex = this.selectedMonth.photos.indexOf(this.selectedPhoto);
    const nextIndex = (currentIndex + 1) % this.selectedMonth.photos.length;
    this.selectedPhoto = this.selectedMonth.photos[nextIndex];
  }

  previousPhoto(): void {
    const currentIndex = this.selectedMonth.photos.indexOf(this.selectedPhoto);
    const previousIndex =
      currentIndex === 0
        ? this.selectedMonth.photos.length - 1
        : currentIndex - 1;

    this.selectedPhoto = this.selectedMonth.photos[previousIndex];
  }

  @ViewChild('thumbnailStrip') thumbnailStrip?: ElementRef<HTMLDivElement>;

scrollThumbnails(direction: 'left' | 'right'): void {
  const strip = this.thumbnailStrip?.nativeElement;

  if (!strip) {
    return;
  }

  const scrollAmount = strip.clientWidth * 0.75;

  strip.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
}
}