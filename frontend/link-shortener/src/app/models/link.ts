export interface CreateLinkRequestDto {
  originalUrl: string;
}

export interface LinkResponseDto {
  id: number;
  code: string;
  originalUrl: string;
  createdAt: string;
  totalClicks: number;
}

export interface LinkStatsResponseDto {
  code: string;
  originalUrl: string;
  createdAt: string;
  totalClicks: number;
  clicksByDay: DailyClicksResponseDto[];
}

export interface DailyClicksResponseDto {
  date: string;
  clicks: number;
}
