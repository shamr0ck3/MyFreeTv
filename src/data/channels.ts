export interface Channel {
  id: string;
  name: string;
  logo: string;
  url: string;
  category: string;
}

export const channels: Channel[] = [
  {
    id: 'astro-awani',
    name: 'Astro Awani',
    logo: 'https://raw.githubusercontent.com/MIFNtechnology/siaranMy/main/logo/AstroAwani.png',
    url: 'https://mifntechnology.github.io/siaranMy/channels/AstroAwani/index.m3u8',
    category: 'News',
  },
  {
    id: 'tv-ikim',
    name: 'TV IKIM',
    logo: 'https://mifntechnology.github.io/siaranMy/logo/TvIkim.png',
    url: 'https://mifntechnology.github.io/siaranMy/channels/TvIkim/index.m3u8',
    category: 'Religion',
  }
];
