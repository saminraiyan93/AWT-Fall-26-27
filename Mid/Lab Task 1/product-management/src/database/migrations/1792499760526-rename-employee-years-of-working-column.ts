import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameEmployeeYearsOfWorkingColumn1792499760526
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const legacyColumn = (await queryRunner.hasColumn(
      "employees",
      "yearsOfWorking",
    ))
      ? "yearsOfWorking"
      : (await queryRunner.hasColumn("employees", "yearsofworking"))
        ? "yearsofworking"
        : undefined;
    const hasExpectedColumn = await queryRunner.hasColumn(
      "employees",
      "years_of_working",
    );

    if (legacyColumn) {
      await queryRunner.renameColumn("employees", legacyColumn, "years_of_working");
    } else if (!hasExpectedColumn) {
      throw new Error(
        'The "employees" table has none of "yearsOfWorking", "yearsofworking", or "years_of_working".',
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasExpectedColumn = await queryRunner.hasColumn(
      "employees",
      "years_of_working",
    );

    if (hasExpectedColumn) {
      await queryRunner.renameColumn("employees", "years_of_working", "yearsOfWorking");
    }
  }
}
