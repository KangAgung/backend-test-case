export class Book {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly title: string,
    public readonly author: string,
    public stock: number,
  ) {}

  isAvailable(): boolean {
    return this.stock > 0;
  }

  borrow(): void {
    if (this.stock <= 0) {
      throw new Error('Book is not available.');
    }
    this.stock--;
  }

  returnBook(): void {
    this.stock++;
  }
}
