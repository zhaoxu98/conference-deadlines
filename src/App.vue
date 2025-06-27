<template>
  <div id="app">
    <header class="header">
      <h1>📅 Personal Conference Deadlines</h1>
      <div class="visitor-badge">
        <img 
          src="https://hitscounter.dev/api/hit?url=https%3A%2F%2Fxzbill.top%2Fzhaoxu%2F&label=Visitors+%28since+May+2025%29&icon=heart-fill&color=%232ecc71" 
          alt="Visitor Counter Badge"
          class="badge-img"
        />
      </div>
      <p>Track your important academic deadlines</p>
    </header>
    <ConferenceTracker />
  </div>
</template>

<script>
import ConferenceTracker from "@/components/ConferenceTracker";

export default {
  name: 'App',
  components: {
    ConferenceTracker,
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  padding: 20px;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.visitor-badge {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.badge-img {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.badge-img:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .header p {
    font-size: 1rem;
  }
  
  #app {
    padding: 15px;
  }
}
</style>
