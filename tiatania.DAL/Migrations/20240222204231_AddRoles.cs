using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace tiatania.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddRoles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "security_role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "System User", "SYSTEM USER" });

            migrationBuilder.InsertData(
                table: "security_role",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { 2, null, "System Admin", "SYSTEM ADMIN" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "security_role",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.UpdateData(
                table: "security_role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "System Admin", "SYSTEM ADMIN" });
        }
    }
}
