# Define variables
GRPC_REPO = https://github.com/grpc/grpc.git
GRPC_DIR = ./grpc
GRPC_BUILD_DIR = $(GRPC_DIR)/cmake/build
GRPC_INSTALL_DIR = $(shell echo $$HOME)/.local
PROTO_SRC = ./backend/proto/todo.proto
PROTO_HDR = ./backend/proto/todo.pb.h
PROTO_SRC_CC = ./backend/proto/todo.pb.cc
GRPC_SRC_CC = ./backend/proto/todo.grpc.pb.cc
GRPC_HDR = ./backend/proto/todo.grpc.pb.h
PROTOC = protoc
PROTOC_FLAGS = --cpp_out=. --grpc_out=. --plugin=protoc-gen-grpc=`which grpc_cpp_plugin`
CXX = g++
CXXFLAGS = -std=c++11 -Wall -Wextra -pedantic
SRCS = $(wildcard ./backend/src/*.cpp) $(PROTO_SRC_CC) $(GRPC_SRC_CC)
OBJS = $(SRCS:.cpp=.o)
EXEC = todo

# Rule to build gRPC libraries
grpc:
    cd $(GRPC_DIR)
	mkdir -p $(GRPC_BUILD_DIR)
	pushd $(GRPC_BUILD_DIR)
	cmake -DgRPC_INSTALL=ON \
		-DgRPC_BUILD_TESTS=OFF \
		-DgRPC_PROTOBUF_PROVIDER=package \
		-DgRPC_ZLIB_PROVIDER=package \
		-DgRPC_CARES_PROVIDER=package \
		-DgRPC_SSL_PROVIDER=package \
		-DgRPC_ABSL_PROVIDER=package \
		-DgRPC_RE2_PROVIDER=package \
		-DCMAKE_INSTALL_PREFIX=$(GRPC_INSTALL_DIR) \
		../..
	make -j
	make install
	popd

# Rule to generate C++ files from protobuf and gRPC
protobuf:
$(PROTO_SRC_CC) $(PROTO_HDR) $(GRPC_SRC_CC) $(GRPC_HDR): $(PROTO_SRC)
    $(PROTOC) $(PROTOC_FLAGS) $(PROTO_SRC)

# Rule to build the executable

$(EXEC): $(OBJS)
    $(CXX) $(CXXFLAGS) $(OBJS) -o $(EXEC) `pkg-config --cflags --libs protobuf grpc++`

# Rule to build object files
%.o: %.cpp
    $(CXX) $(CXXFLAGS) -c $< -o $@

# Rule to clean up generated files
clean:
    rm -f $(OBJS) $(PROTO_SRC_CC) $(PROTO_HDR) $(GRPC_SRC_CC) $(GRPC_HDR) $(EXEC)
