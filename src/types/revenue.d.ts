interface TotalType {
  totalRevenue: number;
}

interface MonthRevenueType {
  lessonId: number;
  title: string;
  revenue: number;
}

interface LessonRevenue {
  month: number;
  lessonId: number;
  title: string;
  revenue: number;
  materialPrice: number;
  rentalPrice: number;
  etcPrice: number;
}
