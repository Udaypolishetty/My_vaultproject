// ===================================================
// Campus Vault — Central Input Validation Utility
// Import and use in any component before API calls
// ===================================================

// ✅ dangerous patterns to block
const SCRIPT_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /<[^>]*on\w+\s*=\s*["'][^"']*["'][^>]*>/gi, // onclick= onerror= etc
  /javascript\s*:/gi,
  /data\s*:\s*text\/html/gi,
  /vbscript\s*:/gi,
  /<iframe/gi,
  /<object/gi,
  /<embed/gi,
  /<link/gi,
  /<meta/gi,
];

const SQL_PATTERNS = [
  /(\bDROP\b|\bDELETE\b|\bINSERT\b|\bUPDATE\b|\bSELECT\b|\bUNION\b|\bEXEC\b)/gi,
  /('|\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi, // ' OR 1=1
  /;\s*(DROP|DELETE|INSERT|UPDATE)/gi,
];

const SPAM_PATTERNS = [
  /(.)\1{9,}/g, // same char repeated 10+ times: aaaaaaaaaa
];

// ✅ check if text contains malicious patterns
const containsMalicious = (text) => {
  for (const pattern of SCRIPT_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) return { found: true, reason: "HTML/script tags are not allowed." };
  }
  for (const pattern of SQL_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) return { found: true, reason: "Invalid characters detected." };
  }
  for (const pattern of SPAM_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) return { found: true, reason: "Repeated characters detected." };
  }
  return { found: false };
};

// ✅ strip HTML tags for display safety (sanitize before showing user content)
export const sanitizeText = (text) => {
  if (!text) return "";
  return text
    .replace(/<[^>]*>/g, "")        // strip all HTML tags
    .replace(/javascript:/gi, "")   // strip javascript: links
    .replace(/on\w+="[^"]*"/gi, "") // strip event handlers
    .trim();
};

// ===================================================
// VALIDATORS — each returns { valid: bool, error: string }
// ===================================================

// ✅ Idea title — 5 to 100 chars
export const validateIdeaTitle = (title) => {
  if (!title || !title.trim()) return { valid: false, error: "Title is required." };
  if (title.trim().length < 5) return { valid: false, error: "Title must be at least 5 characters." };
  if (title.trim().length > 100) return { valid: false, error: "Title must be under 100 characters." };
  const check = containsMalicious(title);
  if (check.found) return { valid: false, error: check.reason };
  return { valid: true, error: "" };
};

// ✅ Idea / proposal description — 10 to 500 chars
export const validateDescription = (text) => {
  if (!text || !text.trim()) return { valid: false, error: "Description is required." };
  if (text.trim().length < 10) return { valid: false, error: "Description must be at least 10 characters." };
  if (text.trim().length > 500) return { valid: false, error: "Description must be under 500 characters." };
  const check = containsMalicious(text);
  if (check.found) return { valid: false, error: check.reason };
  return { valid: true, error: "" };
};

// ✅ Buzz post content — 1 to 280 chars
export const validateBuzzContent = (text) => {
  if (!text || !text.trim()) return { valid: false, error: "Post content is required." };
  if (text.trim().length < 1) return { valid: false, error: "Post cannot be empty." };
  if (text.trim().length > 280) return { valid: false, error: "Post must be under 280 characters." };
  const check = containsMalicious(text);
  if (check.found) return { valid: false, error: check.reason };
  return { valid: true, error: "" };
};

// ✅ Short text — replies, warnings, comments — 1 to maxLen chars
export const validateShortText = (text, maxLen = 200, fieldName = "This field") => {
  if (!text || !text.trim()) return { valid: false, error: `${fieldName} is required.` };
  if (text.trim().length > maxLen) return { valid: false, error: `${fieldName} must be under ${maxLen} characters.` };
  const check = containsMalicious(text);
  if (check.found) return { valid: false, error: check.reason };
  return { valid: true, error: "" };
};

// ✅ News title — 3 to 100 chars
export const validateNewsTitle = (title) => {
  if (!title || !title.trim()) return { valid: false, error: "Title is required." };
  if (title.trim().length < 3) return { valid: false, error: "Title must be at least 3 characters." };
  if (title.trim().length > 100) return { valid: false, error: "Title must be under 100 characters." };
  const check = containsMalicious(title);
  if (check.found) return { valid: false, error: check.reason };
  return { valid: true, error: "" };
};

// ✅ News content — 10 to 1000 chars
export const validateNewsContent = (text) => {
  if (!text || !text.trim()) return { valid: false, error: "Content is required." };
  if (text.trim().length < 10) return { valid: false, error: "Content must be at least 10 characters." };
  if (text.trim().length > 1000) return { valid: false, error: "Content must be under 1000 characters." };
  const check = containsMalicious(text);
  if (check.found) return { valid: false, error: check.reason };
  return { valid: true, error: "" };
};

// ✅ Warning/reason message — 10 to 300 chars
export const validateWarningMessage = (text) => {
  if (!text || !text.trim()) return { valid: false, error: "Reason is required." };
  if (text.trim().length < 10) return { valid: false, error: "Reason must be at least 10 characters." };
  if (text.trim().length > 300) return { valid: false, error: "Reason must be under 300 characters." };
  const check = containsMalicious(text);
  if (check.found) return { valid: false, error: check.reason };
  return { valid: true, error: "" };
};

// ✅ URL validation — for showcase links
export const validateUrl = (url) => {
  if (!url || !url.trim()) return { valid: true, error: "" }; // optional field
  try {
    const parsed = new URL(url.trim());
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return { valid: false, error: "Only http/https links are allowed." };
    }
    // block javascript: and data: urls
    if (/javascript:|data:/i.test(url)) {
      return { valid: false, error: "Invalid link." };
    }
    return { valid: true, error: "" };
  } catch {
    return { valid: false, error: "Please enter a valid URL (https://...)" };
  }
};

// ✅ validate all fields at once — pass an object of { fieldName: result }
// returns { valid: bool, errors: { fieldName: errorString } }
export const validateAll = (validations) => {
  const errors = {};
  let valid = true;
  for (const [field, result] of Object.entries(validations)) {
    if (!result.valid) {
      errors[field] = result.error;
      valid = false;
    }
  }
  return { valid, errors };
};