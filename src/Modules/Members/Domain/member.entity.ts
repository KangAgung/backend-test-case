export class Member {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly name: string,
  ) {}

  private borrowedBooks: string[] = [];
  private penaltyEndDate: Date | null = null;

  canBorrow(): boolean {
    return this.borrowedBooks.length <= 2 && !this.isPenalized();
  }

  borrowBook(bookCode: string): void {
    if (!this.canBorrow()) {
      throw new Error('Cannot borrow more books.');
    }
    this.borrowedBooks.push(bookCode);
  }

  returnBook(bookCode: string, borrowedDate: Date): void {
    const index = this.borrowedBooks.indexOf(bookCode);
    if (index === -1) {
      throw new Error('Book not borrowed by this member.');
    }
    this.borrowedBooks.splice(index, 1);

    const returnDate = new Date();
    const daysBorrowed = Math.floor(
      (returnDate.getTime() - borrowedDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysBorrowed > 7) {
      this.setPenalty(3);
    }
  }

  isPenalized(): boolean {
    if (!this.penaltyEndDate) return false;
    return new Date() < this.penaltyEndDate;
  }

  setPenalty(days: number): void {
    this.penaltyEndDate = new Date();
    this.penaltyEndDate.setDate(this.penaltyEndDate.getDate() + days);
  }

  getBorrowedBooks(): string[] {
    return this.borrowedBooks;
  }

  getPenaltyEndDate(): Date | null {
    return this.penaltyEndDate;
  }

  setBorrowedBooks(borrowedBooks: string[]): void {
    this.borrowedBooks = borrowedBooks;
  }

  setPenaltyEndDate(penaltyEndDate: Date | null): void {
    this.penaltyEndDate = penaltyEndDate;
  }
}
