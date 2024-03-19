﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using tiatania.DAL;

#nullable disable

namespace tiatania.DAL.Migrations
{
    [DbContext(typeof(TiataniaContext))]
    [Migration("20240303031652_AddMenuReferences")]
    partial class AddMenuReferences
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseCollation("utf8mb4_0900_ai_ci")
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.HasCharSet(modelBuilder, "utf8mb4");

            modelBuilder.Entity("tiatania.DAL.Models.Menu", b =>
                {
                    b.Property<int>("MenuId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("menu_id");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("active");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("created_by");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp")
                        .HasColumnName("created_on");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("varchar(255)")
                        .HasColumnName("image_path");

                    b.Property<int>("MenuTypeId")
                        .HasColumnType("int")
                        .HasColumnName("menu_type_id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)")
                        .HasColumnName("name");

                    b.Property<int>("Price")
                        .HasColumnType("int")
                        .HasColumnName("price");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("int")
                        .HasColumnName("updated_by");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("timestamp")
                        .HasColumnName("updated_on");

                    b.HasKey("MenuId")
                        .HasName("PRIMARY");

                    b.HasIndex(new[] { "MenuTypeId" }, "menu_type_id_idx");

                    b.ToTable("menu", (string)null);
                });

            modelBuilder.Entity("tiatania.DAL.Models.ReferenceMenuType", b =>
                {
                    b.Property<int>("MenuTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("menu_type_id");

                    b.Property<bool>("Active")
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("active");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasMaxLength(45)
                        .HasColumnType("varchar(45)")
                        .HasColumnName("code");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("created_by");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("timestamp")
                        .HasColumnName("created_on");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("int")
                        .HasColumnName("updated_by");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("timestamp")
                        .HasColumnName("updated_on");

                    b.HasKey("MenuTypeId")
                        .HasName("PRIMARY");

                    b.ToTable("reference_menu_type", (string)null);

                    b.HasData(
                        new
                        {
                            MenuTypeId = 1,
                            Active = true,
                            Code = "Cervezas",
                            CreatedBy = 1,
                            CreatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5720),
                            UpdatedBy = 1,
                            UpdatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5772)
                        },
                        new
                        {
                            MenuTypeId = 2,
                            Active = true,
                            Code = "Licores",
                            CreatedBy = 1,
                            CreatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5800),
                            UpdatedBy = 1,
                            UpdatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5802)
                        },
                        new
                        {
                            MenuTypeId = 3,
                            Active = true,
                            Code = "Vinos",
                            CreatedBy = 1,
                            CreatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5817),
                            UpdatedBy = 1,
                            UpdatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5818)
                        },
                        new
                        {
                            MenuTypeId = 4,
                            Active = true,
                            Code = "Bebidas",
                            CreatedBy = 1,
                            CreatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5831),
                            UpdatedBy = 1,
                            UpdatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5833)
                        },
                        new
                        {
                            MenuTypeId = 5,
                            Active = true,
                            Code = "Cigarrilos",
                            CreatedBy = 1,
                            CreatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5846),
                            UpdatedBy = 1,
                            UpdatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5848)
                        },
                        new
                        {
                            MenuTypeId = 6,
                            Active = true,
                            Code = "Snacks",
                            CreatedBy = 1,
                            CreatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5864),
                            UpdatedBy = 1,
                            UpdatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5866)
                        },
                        new
                        {
                            MenuTypeId = 7,
                            Active = true,
                            Code = "Cuidado Personal",
                            CreatedBy = 1,
                            CreatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5880),
                            UpdatedBy = 1,
                            UpdatedOn = new DateTime(2024, 3, 2, 22, 16, 51, 740, DateTimeKind.Local).AddTicks(5881)
                        });
                });

            modelBuilder.Entity("tiatania.DAL.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("security_role", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "User",
                            NormalizedName = "USER"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        });
                });

            modelBuilder.Entity("tiatania.DAL.Models.RoleClaim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("security_role_claim", (string)null);
                });

            modelBuilder.Entity("tiatania.DAL.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("active")
                        .HasDefaultValueSql("'1'");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("created_by");

                    b.Property<DateTime>("CreatedOn")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp")
                        .HasColumnName("created_on")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("FirstName")
                        .HasMaxLength(25)
                        .HasColumnType("varchar(25)")
                        .HasColumnName("first_name");

                    b.Property<string>("LastName")
                        .HasMaxLength(25)
                        .HasColumnType("varchar(25)")
                        .HasColumnName("last_name");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("int")
                        .HasColumnName("updated_by");

                    b.Property<DateTime>("UpdatedOn")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp")
                        .HasColumnName("updated_on")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("security_user", (string)null);
                });

            modelBuilder.Entity("tiatania.DAL.Models.UserClaim", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("security_user_claim", (string)null);
                });

            modelBuilder.Entity("tiatania.DAL.Models.UserLogin", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("security_user_login", (string)null);
                });

            modelBuilder.Entity("tiatania.DAL.Models.UserRole", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<bool>("Active")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("active")
                        .HasDefaultValueSql("'1'");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("int")
                        .HasColumnName("created_by");

                    b.Property<DateTime>("CreatedOn")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp")
                        .HasColumnName("created_on")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("int")
                        .HasColumnName("updated_by");

                    b.Property<DateTime>("UpdatedOn")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp")
                        .HasColumnName("updated_on")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("security_user_role", (string)null);
                });

            modelBuilder.Entity("tiatania.DAL.Models.UserToken", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("Name")
                        .HasMaxLength(128)
                        .HasColumnType("varchar(128)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("security_user_token", (string)null);
                });

            modelBuilder.Entity("tiatania.DAL.Models.Menu", b =>
                {
                    b.HasOne("tiatania.DAL.Models.ReferenceMenuType", "MenuType")
                        .WithMany("Menus")
                        .HasForeignKey("MenuTypeId")
                        .IsRequired()
                        .HasConstraintName("menu_type_id");

                    b.Navigation("MenuType");
                });

            modelBuilder.Entity("tiatania.DAL.Models.RoleClaim", b =>
                {
                    b.HasOne("tiatania.DAL.Models.Role", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("tiatania.DAL.Models.UserClaim", b =>
                {
                    b.HasOne("tiatania.DAL.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("tiatania.DAL.Models.UserLogin", b =>
                {
                    b.HasOne("tiatania.DAL.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("tiatania.DAL.Models.UserRole", b =>
                {
                    b.HasOne("tiatania.DAL.Models.Role", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("tiatania.DAL.Models.User", "User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("tiatania.DAL.Models.UserToken", b =>
                {
                    b.HasOne("tiatania.DAL.Models.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("tiatania.DAL.Models.ReferenceMenuType", b =>
                {
                    b.Navigation("Menus");
                });

            modelBuilder.Entity("tiatania.DAL.Models.Role", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("tiatania.DAL.Models.User", b =>
                {
                    b.Navigation("Roles");
                });
#pragma warning restore 612, 618
        }
    }
}
