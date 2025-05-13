import { users, type User, type InsertUser, type InsertEtymologyRequest, type EtymologyRequest } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createEtymologyRequest(request: InsertEtymologyRequest): Promise<EtymologyRequest>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private etymologyRequests: Map<number, EtymologyRequest>;
  currentId: number;
  currentRequestId: number;

  constructor() {
    this.users = new Map();
    this.etymologyRequests = new Map();
    this.currentId = 1;
    this.currentRequestId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createEtymologyRequest(insertRequest: InsertEtymologyRequest): Promise<EtymologyRequest> {
    const id = this.currentRequestId++;
    const request: EtymologyRequest = { ...insertRequest, id };
    this.etymologyRequests.set(id, request);
    return request;
  }
}

export const storage = new MemStorage();
