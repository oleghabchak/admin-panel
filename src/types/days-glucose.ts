export type DaysGlucose = [{
    glucoseData: [
        {
          value: number,
          timestamp: string
        }
      ],
    timeInRange: [{ 
        very_high: number,
        high: number,
        normal: number,
        low: number,
        very_low: number}],
   
  }];
