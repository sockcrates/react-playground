const std = @import("std");

const GCC_INCLUDE_PATH_VAR = "GCC_INCLUDE_PATH";

pub fn build(b: *std.build.Builder) void {
    // Standard target options allows the person running `zig build` to choose
    // what target to build for. Here we do not override the defaults, which
    // means any target is allowed, and the default is native. Other options
    // for restricting supported target set are available.
    const target = b.standardTargetOptions(.{});

    // Standard release options allow the person running `zig build` to select
    // between Debug, ReleaseSafe, ReleaseFast, and ReleaseSmall.
    const mode = b.standardReleaseOptions();

    const exe = b.addExecutable("backend", "src/main.zig");
    exe.setTarget(target);
    exe.setBuildMode(mode);

    exe.addIncludePath("src");

    const maybeGccIncludePath = std.os.getenv(GCC_INCLUDE_PATH_VAR) orelse {
        std.log.err(
            "Environment variable " ++
                GCC_INCLUDE_PATH_VAR ++
                " not set. This may cause build errors.\n",
            .{},
        );
        return;
    };
    exe.addIncludePath(maybeGccIncludePath);

    exe.addCSourceFile("src/shopping_list_server.cc", &.{});

    exe.linkSystemLibrary("c++");
    exe.linkSystemLibrary("");

    exe.install();

    const run_cmd = exe.run();
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| {
        run_cmd.addArgs(args);
    }

    const run_step = b.step("run", "Run the app");
    run_step.dependOn(&run_cmd.step);

    const exe_tests = b.addTest("src/main.zig");
    exe_tests.setTarget(target);
    exe_tests.setBuildMode(mode);

    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&exe_tests.step);
}
