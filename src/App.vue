<template>
  <div id="app">
    <header class="header">
      <h1>📅 Personal Conference Deadlines</h1>
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
