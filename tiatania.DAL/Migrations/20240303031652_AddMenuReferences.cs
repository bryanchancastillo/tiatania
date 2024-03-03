using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace tiatania.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddMenuReferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "reference_menu_type",
                columns: new[] { "menu_type_id", "active", "code", "created_by", "created_on", "updated_by", "updated_on" },
                values: new object[,]
                {
                    { 1, true, "Cervezas", 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5720), 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5772) },
                    { 2, true, "Licores", 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5800), 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5802) },
                    { 3, true, "Vinos", 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5817), 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5818) },
                    { 4, true, "Bebidas", 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5831), 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5833) },
                    { 5, true, "Cigarrilos", 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5846), 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5848) },
                    { 6, true, "Snacks", 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5864), 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5866) },
                    { 7, true, "Cuidado Personal", 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5880), 1, new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5881) }
                });

            migrationBuilder.UpdateData(
                table: "security_role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "User", "USER" });

            migrationBuilder.UpdateData(
                table: "security_role",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "Admin", "ADMIN" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "reference_menu_type",
                keyColumn: "menu_type_id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "reference_menu_type",
                keyColumn: "menu_type_id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "reference_menu_type",
                keyColumn: "menu_type_id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "reference_menu_type",
                keyColumn: "menu_type_id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "reference_menu_type",
                keyColumn: "menu_type_id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "reference_menu_type",
                keyColumn: "menu_type_id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "reference_menu_type",
                keyColumn: "menu_type_id",
                keyValue: 7);

            migrationBuilder.UpdateData(
                table: "security_role",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "System User", "SYSTEM USER" });

            migrationBuilder.UpdateData(
                table: "security_role",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Name", "NormalizedName" },
                values: new object[] { "System Admin", "SYSTEM ADMIN" });
        }
    }
}
