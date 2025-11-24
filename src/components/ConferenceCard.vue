<template>
  <div class="conference-card">
    <div class="card-header">
      <h3 class="conference-title">{{ conference.title }}</h3>
      <div class="conference-tags">
        <span v-for="tag in conference.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
    
    <p class="conference-description">{{ conference.description }}</p>
    
    <div class="conference-details">
      <div class="detail-item">
        <span class="icon">📅</span>
        <span>{{ conference.conference_date }}</span>
      </div>
      <div class="detail-item">
        <span class="icon">📍</span>
        <span>{{ conference.location }}</span>
      </div>
      <div class="detail-item">
        <span class="icon">🌐</span>
        <a :href="conference.website" target="_blank" class="website-link">Website</a>
      </div>
    </div>

    <div class="deadlines">
      <div v-for="deadline in conference.deadlines" :key="deadline.type" class="deadline-item">
        <div class="deadline-header">
          <span class="deadline-type">{{ formatDeadlineType(deadline.type) }}</span>
          <span class="deadline-timezone">({{ deadline.timezone }})</span>
        </div>
        <div class="deadline-info">
          <div class="deadline-date">{{ formatDate(deadline.date) }}</div>
          <div :class="['countdown', getDeadlineStatus(deadline)]">
            {{ getCountdown(deadline) }}
          </div>
        </div>
      </div>
    </div>

    <div class="card-actions">
      <button @click="addToGoogleCalendar" class="action-btn google">
        📅 Google Calendar
      </button>
      <button @click="generateICS" class="action-btn ics">
        📄 Download .ics
      </button>
    </div>
  </div>
</template>

<script>
const moment = require('moment-timezone');

export default {
  name: "ConferenceCard",
  props: {
    conference: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      countdownInterval: null
    };
  },
  mounted() {
    this.startCountdown();
  },
  beforeDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  methods: {
    formatDeadlineType(type) {
      const types = {
        'abstract': 'Abstract Deadline',
        'full_paper': 'Full Paper Deadline',
        'paper': 'Paper Deadline',
        'registration': 'Registration Deadline'
        'notification': 'Workshop Application Notification'
      };
      return types[type] || type;
    },
    
    parseDeadlineWithTimezone(deadline) {
      // 将时区简写转换为 IANA 时区名称
      const timezoneMap = {
        'AoE': 'Etc/GMT+12',    // UTC-12 (AoE)
        'PST': 'America/Los_Angeles',  // UTC-8 (PST)
        'EST': 'America/New_York',     // UTC-5 (EST)
        'CST': 'America/Chicago',      // UTC-6 (CST)
        'MST': 'America/Denver',       // UTC-7 (MST)
        'UTC': 'UTC',
        'GMT': 'UTC',
        'CET': 'Europe/Paris',         // UTC+1 (CET)
        'JST': 'Asia/Tokyo',           // UTC+9 (JST)
        'CST-8': 'Asia/Shanghai'       // UTC+8 (China)
      };
      
      // 获取 IANA 时区名或直接使用提供的时区
      const timezone = timezoneMap[deadline.timezone] || deadline.timezone;
      
      // 使用 moment-timezone 解析指定时区的时间
      return moment.tz(deadline.date, timezone);
    },
    
    formatDate(dateStr) {
      // 直接显示原始填写的时间，不进行时区转换
      return moment(dateStr).format('MMMM DD, YYYY HH:mm');
    },
    
    getDeadlineStatus(deadline) {
      const deadlineTime = this.parseDeadlineWithTimezone(deadline);
      const now = moment();
      const diffDays = deadlineTime.diff(now, 'days');
      
      if (diffDays < 0) return 'overdue';
      if (diffDays <= 7) return 'urgent';
      if (diffDays <= 30) return 'warning';
      return 'safe';
    },
    
    getCountdown(deadline) {
      const deadlineTime = this.parseDeadlineWithTimezone(deadline);
      const now = moment();
      const diff = deadlineTime.diff(now);
      
      if (diff < 0) {
        return 'Overdue';
      }
      
      const duration = moment.duration(diff);
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      
      // 获取用户当前时区的UTC偏移
      const userOffset = moment().utcOffset();
      const offsetHours = Math.floor(Math.abs(userOffset) / 60);
      const offsetMinutes = Math.abs(userOffset) % 60;
      const offsetSign = userOffset >= 0 ? '+' : '-';
      const userUtcZone = offsetMinutes > 0 ? 
        `UTC${offsetSign}${offsetHours}:${offsetMinutes.toString().padStart(2, '0')}` :
        `UTC${offsetSign}${offsetHours}`;
      
      if (days > 0) {
        return `${days}d ${hours}h ${minutes}m (${userUtcZone})`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}m (${userUtcZone})`;
      } else if (minutes > 0) {
        return `${minutes}m ${seconds}s (${userUtcZone})`;
      } else {
        return `${seconds}s (${userUtcZone})`;
      }
    },
    
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        this.$forceUpdate();
      }, 1000); // Update every second for more accurate countdown
    },
    
    addToGoogleCalendar() {
      const deadline = this.conference.deadlines[0];
      const deadlineTime = this.parseDeadlineWithTimezone(deadline);
      const startDate = deadlineTime.utc().format('YYYYMMDDTHHmmss') + 'Z';
      const endDate = deadlineTime.clone().add(1, 'hour').utc().format('YYYYMMDDTHHmmss') + 'Z';
      
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(this.conference.title + ' Deadline')}&dates=${startDate}/${endDate}&details=${encodeURIComponent(this.conference.description + '\n' + this.conference.website)}`;
      
      window.open(url, '_blank');
    },
    
    generateICS() {
      const deadline = this.conference.deadlines[0];
      const deadlineTime = this.parseDeadlineWithTimezone(deadline);
      const startDate = deadlineTime.utc().format('YYYYMMDDTHHmmss') + 'Z';
      const endDate = deadlineTime.clone().add(1, 'hour').utc().format('YYYYMMDDTHHmmss') + 'Z';
      
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Personal Conference Tracker//EN
BEGIN:VEVENT
UID:${this.conference.title}-${Date.now()}@personal-deadlines
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${this.conference.title} Deadline
DESCRIPTION:${this.conference.description}\\n${this.conference.website}
LOCATION:${this.conference.location}
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.conference.title}-deadline.ics`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
};
</script>

<style scoped>
.conference-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.conference-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.conference-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  flex: 1;
}

.conference-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-left: 12px;
}

.tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.conference-description {
  color: #4a5568;
  margin-bottom: 16px;
  line-height: 1.5;
}

.conference-details {
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  color: #4a5568;
}

.icon {
  margin-right: 8px;
  width: 20px;
}

.website-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.website-link:hover {
  text-decoration: underline;
}

.deadlines {
  margin-bottom: 20px;
}

.deadline-item {
  background: #f7fafc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border-left: 4px solid #667eea;
}

.deadline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.deadline-type {
  font-weight: 600;
  color: #2d3748;
}

.deadline-timezone {
  font-size: 0.875rem;
  color: #718096;
}

.deadline-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deadline-date {
  color: #4a5568;
  font-size: 0.9rem;
}

.countdown {
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 0.875rem;
}

.countdown.safe {
  background: #c6f6d5;
  color: #22543d;
}

.countdown.warning {
  background: #fed7d7;
  color: #822727;
}

.countdown.urgent {
  background: #feb2b2;
  color: #742a2a;
}

.countdown.overdue {
  background: #fc8181;
  color: #742a2a;
}

.card-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.action-btn.google {
  background: #4285f4;
  color: white;
}

.action-btn.ics {
  background: #6c757d;
  color: white;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .conference-card {
    padding: 20px;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .conference-tags {
    margin-left: 0;
    margin-top: 8px;
  }
  
  .deadline-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .card-actions {
    flex-direction: column;
  }
}
</style> 