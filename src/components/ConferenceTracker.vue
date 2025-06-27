<template>
  <div class="conference-tracker">
    <div class="controls">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="🔍 Search conferences..." 
          class="search-input"
        />
      </div>
      <div class="filter-tags">
        <button 
          v-for="tag in allTags" 
          :key="tag"
          :class="['tag-btn', { active: selectedTags.includes(tag) }]"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </button>
        <button 
          v-if="selectedTags.length > 0"
          class="clear-filters"
          @click="clearFilters"
        >
          Clear All
        </button>
      </div>
    </div>

    <div class="conferences-grid">
      <ConferenceCard 
        v-for="conference in filteredConferences" 
        :key="conference.title"
        :conference="conference"
      />
    </div>

    <div v-if="filteredConferences.length === 0" class="no-results">
      <p>📭 No conferences found matching your criteria</p>
    </div>
  </div>
</template>

<script>
import ConferenceCard from "./ConferenceCard";

export default {
  name: "ConferenceTracker",
  components: {
    ConferenceCard
  },
  data() {
    return {
      searchQuery: "",
      selectedTags: [],
      conferences: [
      {
          title: "ICLR 2026",
          description: "International Conference on Learning Representations",
          website: "https://iclr.cc/Conferences/2026",
          deadlines: [
          { type: "abstract", date: "2025-09-19 23:59:59", timezone: "AoE" },
          { type: "full_paper", date: "2025-09-24 23:59:59", timezone: "AoE" }
          ],
          conference_date: "May, 2026",
          location: "TBD",
          tags: ["AI", "ML", "DL"]
        },
        // {
        //   title: "NAACL 2026",
        //   description: "North American Chapter of the Association for Computational Linguistics",
        //   website: "https://2024.naacl.org/",
        //   deadlines: [
        //   // { type: "abstract", date: "2025-10-19 23:59:59", timezone: "AoE" },
        //   { type: "full_paper", date: "2025-10-06 23:59:59", timezone: "AoE" }
        //   ],
        //   conference_date: "Jun, 2026",
        //   location: "TBD",
        //   tags: ["AI", "ML", "DL", "NLP"]
        // },
        {
          title: "CVPR 2026 (Estimated Time)",
          description: "Conference on Computer Vision and Pattern Recognition",
          website: "https://cvpr.thecvf.com/",
          deadlines: [
            { type: "abstract", date: "2025-11-08 07:59:59", timezone: "UTC" },
            { type: "full_paper", date: "2025-11-15 07:59:59", timezone: "UTC" }
          ],
          conference_date: "Jun, 2026",
          location: "TBD",
          tags: ["AI", "ML", "DL", "CV"]
        },
        {
          title: "ACL 2026",
          description: "Association for Computational Linguistics",
          website: "https://2026.aclweb.org/",
          deadlines: [
            // { type: "abstract", date: "2026-01-05 23:59:59", timezone: "AoE" },
            { type: "full_paper", date: "2026-01-05 23:59:59", timezone: "AoE" }
          ],
          conference_date: "Jul, 2026",
          location: "San Diego, USA",
          tags: ["AI", "ML", "DL", "NLP"]
        },
        {
          title: "ICML 2026 (Estimated Time)",
          description: "International Conference on Machine Learning",
          website: "https://icml.cc/",
          deadlines: [
            { type: "abstract", date: "2026-01-22 23:59:59", timezone: "AoE" },
            { type: "full_paper", date: "2026-01-29 23:59:59", timezone: "AoE" }
          ],
          conference_date: "Jul, 2026",
          location: "TBD",
          tags: ["AI", "ML", "DL"]
        },
        {
          title: "COLM 2026 (Estimated Time)",
          description: "Conference on Language Modeling",
          website: "https://colmweb.org/dates.html",
          deadlines: [
            { type: "abstract", date: "2026-03-21 23:59:59", timezone: "AoE" },
            { type: "full_paper", date: "2026-03-27 23:59:59", timezone: "AoE" }
          ],
          conference_date: "Oct, 2026",
          location: "TBD",
          tags: ["AI", "ML", "DL", "NLP"]
        },
        {
          title: "EMNLP 2026",
          description: "Empirical Methods in Natural Language Processing",
          website: "https://2025.emnlp.org/",
          deadlines: [
          // { type: "abstract", date: "2025-09-19 23:59:59", timezone: "AoE" },
          { type: "full_paper", date: "2026-05-19 23:59:59", timezone: "AoE" }
          ],
          conference_date: "Nov, 2026",
          location: "TBD",
          tags: ["AI", "ML", "DL"]
        },

        
        {
          title: "NeurIPS 2026 (Estimated Time)",
          description: "Conference on Neural Information Processing Systems",
          website: "https://neurips.cc",
          deadlines: [
          { type: "abstract", date: "2026-05-14 23:59:59", timezone: "AoE" },
          { type: "full_paper", date: "2026-05-21 23:59:59", timezone: "AoE" }
          ],
          conference_date: "Dec, 2026",
          location: "TBD",
          tags: ["AI", "ML", "DL"]
        },
      ]
    };
  },
  computed: {
    allTags() {
      const tags = new Set();
      this.conferences.forEach(conf => {
        conf.tags.forEach(tag => tags.add(tag));
      });
      return Array.from(tags).sort();
    },
    filteredConferences() {
      return this.conferences.filter(conf => {
        const matchesSearch = !this.searchQuery || 
          conf.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          conf.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        
        const matchesTags = this.selectedTags.length === 0 || 
          this.selectedTags.some(tag => conf.tags.includes(tag));
        
        return matchesSearch && matchesTags;
      });
    }
  },
  methods: {
    toggleTag(tag) {
      if (this.selectedTags.includes(tag)) {
        this.selectedTags = this.selectedTags.filter(t => t !== tag);
      } else {
        this.selectedTags.push(tag);
      }
    },
    clearFilters() {
      this.selectedTags = [];
      this.searchQuery = "";
    }
  }
};
</script>

<style scoped>
.conference-tracker {
  max-width: 1200px;
  margin: 0 auto;
}

.controls {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.tag-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.tag-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  font-weight: 600;
}

.clear-filters {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 100, 100, 0.8);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.clear-filters:hover {
  background: rgba(255, 100, 100, 0.9);
  transform: translateY(-1px);
}

.conferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.no-results {
  text-align: center;
  color: white;
  font-size: 18px;
  margin-top: 40px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .conferences-grid {
    grid-template-columns: 1fr;
  }
  
  .controls {
    padding: 15px;
  }
  
  .filter-tags {
    gap: 6px;
  }
  
  .tag-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style> 