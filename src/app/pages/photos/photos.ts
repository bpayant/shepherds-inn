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

const photos202606_General = [
  '712524407_1612550106913128_5459625473092191142_n.jpg',
  '719828530_1618300419671430_1046351550750026785_n.jpg',
  '720166737_1618300393004766_8998232660249080631_n.jpg'
];

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

const photos202604_Easter = [
  '661312771_1561267195374753_8933118100586200062_n.jpg',
  '660768006_1561267275374745_3977697548109619985_n.jpg',
  '661373462_1561267502041389_5210193814273979629_n.jpg',
  '661707271_1561267532041386_62777900241507441_n.jpg',
  '662071767_1561267582041381_4180882300058793895_n.jpg',
  '662466527_1561267222041417_1009883945744708398_n.jpg',
  '662591354_1561267332041406_7583839909303261198_n.jpg',
  '662715423_1561267432041396_2938709380318486697_n.jpg',
  '662876446_1563657385135734_1028579552532165569_n.jpg',
  '663134062_1561267512041388_5553185037059310221_n.jpg',
  '663196111_1561267555374717_4821973257423864851_n.jpg',
  '663287391_1561267338708072_1497073836504237348_n.jpg',
  '663370382_1561267568708049_477634884139432762_n.jpg',
  '666302381_1561267418708064_376066063992013171_n.jpg',
  '666518830_1561267485374724_8140830975709718499_n.jpg',
  '666888108_1563657341802405_4655847321364993070_n.jpg',
  '667027427_1561265605374912_5536563362256030067_n.jpg'
];

const photos202604_General = [
  '667788336_1563657295135743_542062604542834840_n.jpg',
  '668611994_1563748865126586_9155760776947546109_n.jpg',
  '669196048_1563657328469073_452151489569673652_n.jpg',
  '670913172_1566803158154490_3035674941746871512_n.jpg',
  '678410368_1574307960737343_3176402265961818807_n.jpg'
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
        ...buildPhotos('2026-05', 'May 2026', photos202605_MargaretsBirthday, "Turning 102"),
        ...buildPhotos('2026-05', 'May 2026', photos202605_UscProm, 'USC Prom' ),
        ...buildPhotos('2026-05', 'May 2026', photos202605_General)
      ]
    },
    {
      folder: '2026-04',
      title: 'April 2026',
      photos: [
        ...buildPhotos('2026-04', 'April 2026', photos202604_Easter, "Easter" ),
        ...buildPhotos('2026-04', 'April 2026', photos202604_General)
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
    this.centerThumbnailSoon();
  }

  showNewerMonth(): void {
    if (!this.newerMonth) {
      return;
    }

    this.selectedMonthIndex--;
    this.selectedPhoto = this.selectedMonth.photos[0];
    this.centerThumbnailSoon();
  }

  showOlderMonth(): void {
    if (!this.olderMonth) {
      return;
    }

    this.selectedMonthIndex++;
    this.selectedPhoto = this.selectedMonth.photos[0];
    this.centerThumbnailSoon();
  }

  nextPhoto(): void {
    const currentIndex = this.selectedMonth.photos.indexOf(this.selectedPhoto);

    if (currentIndex < this.selectedMonth.photos.length - 1) {
      this.selectedPhoto = this.selectedMonth.photos[currentIndex + 1];
    }
    else if (this.olderMonth) {
      this.selectedMonthIndex++;
      this.selectedPhoto = this.selectedMonth.photos[0];
    }

    this.centerThumbnailSoon();
  }

  previousPhoto(): void {
    const currentIndex = this.selectedMonth.photos.indexOf(this.selectedPhoto);

    if (currentIndex > 0) {
      this.selectedPhoto = this.selectedMonth.photos[currentIndex - 1];
    }
    else if (this.newerMonth) {
      this.selectedMonthIndex--;
      this.selectedPhoto =
        this.selectedMonth.photos[this.selectedMonth.photos.length - 1];
    }
    
    this.centerThumbnailSoon();
  }

  @ViewChild('thumbnailStrip') thumbnailStrip?: ElementRef<HTMLDivElement>;

  private centerThumbnailSoon(): void {
    setTimeout(() => {
      this.centerSelectedThumbnail();
    }, 0);
  }

  private centerSelectedThumbnail(): void {
    const strip = this.thumbnailStrip?.nativeElement;

    if (!strip) {
      return;
    }

    const activeThumbnail =
      strip.querySelector('.thumbnail-button.active') as HTMLElement | null;

    if (!activeThumbnail) {
      return;
    }

    // Calculate the center
    const stripRect = strip.getBoundingClientRect();
    const thumbnailRect = activeThumbnail.getBoundingClientRect();
    const thumbnailCenterRelativeToStrip =
      thumbnailRect.left - stripRect.left + thumbnailRect.width / 2;
    
      // Update the thumbnail strip
    const targetScrollLeft =
      strip.scrollLeft +
      thumbnailCenterRelativeToStrip -
      strip.clientWidth / 2;
    strip.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  }

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