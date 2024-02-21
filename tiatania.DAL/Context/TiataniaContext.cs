using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using tiatania.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Data;

namespace tiatania.DAL;

public partial class TiataniaContext : IdentityDbContext<User, Role, int, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
{
    public TiataniaContext(DbContextOptions<TiataniaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<ReferenceMenuType> ReferenceMenuTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        base.OnModelCreating(modelBuilder);

        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("security_user");
            entity.Property(e => e.FirstName).HasColumnName("first_name");
            entity.Property(e => e.LastName).HasColumnName("last_name");
            entity.HasMany(e => e.Roles).WithOne().HasForeignKey(uc => uc.UserId).IsRequired();
            entity.Property(e => e.Active).HasDefaultValueSql("'1'").HasColumnName("active");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedOn).HasColumnType("timestamp").HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_on");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.UpdatedOn).HasColumnType("timestamp").HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_on");
        });

        modelBuilder.Entity<Role>().ToTable("security_role");

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(ur => new { ur.UserId, ur.RoleId });

            entity.ToTable("security_user_role");
            entity.HasOne(ur => ur.User).WithMany(u => u.Roles).HasForeignKey(ur => ur.UserId);
            entity.HasOne(ur => ur.Role).WithMany(r => r.UserRoles).HasForeignKey(ur => ur.RoleId);
            entity.Property(e => e.Active).HasDefaultValueSql("'1'").HasColumnName("active");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedOn).HasColumnType("timestamp").HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("created_on");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.UpdatedOn).HasColumnType("timestamp").HasDefaultValueSql("CURRENT_TIMESTAMP").HasColumnName("updated_on");

        });

        modelBuilder.Entity<UserClaim>().ToTable("security_user_claim");
        modelBuilder.Entity<UserLogin>().ToTable("security_user_login");
        modelBuilder.Entity<RoleClaim>().ToTable("security_role_claim");
        modelBuilder.Entity<UserToken>().ToTable("security_user_token");

        modelBuilder.Entity<Role>().HasData(new Role() { Id = 1, Name = "System Admin", NormalizedName = "SYSTEM ADMIN" });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.MenuId).HasName("PRIMARY");

            entity.ToTable("menu");

            entity.HasIndex(e => e.MenuTypeId, "menu_type_id_idx");

            entity.Property(e => e.MenuId).HasColumnName("menu_id");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("timestamp")
                .HasColumnName("created_on");
            entity.Property(e => e.ImagePath)
                .HasMaxLength(255)
                .HasColumnName("image_path");
            entity.Property(e => e.MenuTypeId).HasColumnName("menu_type_id");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.UpdatedOn)
                .HasColumnType("timestamp")
                .HasColumnName("updated_on");

            entity.HasOne(d => d.MenuType).WithMany(p => p.Menus)
                .HasForeignKey(d => d.MenuTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("menu_type_id");
        });

        modelBuilder.Entity<ReferenceMenuType>(entity =>
        {
            entity.HasKey(e => e.MenuTypeId).HasName("PRIMARY");

            entity.ToTable("reference_menu_type");

            entity.Property(e => e.MenuTypeId).HasColumnName("menu_type_id");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.Code)
                .HasMaxLength(45)
                .HasColumnName("code");
            entity.Property(e => e.CreatedBy).HasColumnName("created_by");
            entity.Property(e => e.CreatedOn)
                .HasColumnType("timestamp")
                .HasColumnName("created_on");
            entity.Property(e => e.UpdatedBy).HasColumnName("updated_by");
            entity.Property(e => e.UpdatedOn)
                .HasColumnType("timestamp")
                .HasColumnName("updated_on");
        });

        // OnModelCreatingPartial(modelBuilder);
    }

   // partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
