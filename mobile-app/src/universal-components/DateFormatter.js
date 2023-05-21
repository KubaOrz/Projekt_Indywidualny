function formatLocalDateTime(dateTime) {
    const formatter = new Intl.DateTimeFormat('pl', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  
    return formatter.format(dateTime);
}

export {formatLocalDateTime};