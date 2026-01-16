enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

class InstagramLogger {
  static log(level: LogLevel, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data,
      source: 'instagram-integration',
    };
    
    if (import.meta.env.DEV) {
      console[level](logEntry);
    }
  }

  static info(message: string, data?: any) {
    this.log(LogLevel.INFO, message, data);
  }

  static warn(message: string, data?: any) {
    this.log(LogLevel.WARN, message, data);
  }

  static error(message: string, data?: any) {
    this.log(LogLevel.ERROR, message, data);
  }
}

export { InstagramLogger, LogLevel };
