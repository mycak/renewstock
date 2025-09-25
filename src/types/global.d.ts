// CSS Module declarations
declare module '*.css' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '*.sass' {
  const content: string;
  export default content;
}

// Specific path alias CSS declarations
declare module '@/styles/*';

// JSON module declarations
declare module '*.json' {
  const content: Record<string, unknown>;
  export default content;
}
