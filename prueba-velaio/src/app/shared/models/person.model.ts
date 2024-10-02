import { Skill } from './skill.model';

/**
 * Información de una persona
 */
export interface Person {
  /**
   * Identificador único de la persona
   */
  id: number;
  /**
   * Nombre completo de la persona
   */
  full_name: string;
  /**
   * Edad de la persona
   */
  age: number;
  /**
   * Habilidades de la persona
   */
  skills: Skill[];
}
